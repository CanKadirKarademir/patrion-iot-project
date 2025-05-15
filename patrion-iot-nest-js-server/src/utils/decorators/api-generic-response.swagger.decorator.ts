import { GenericResponse } from 'models';
import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiGenericResponse = <TModel extends Type<any>>(
  model: TModel,
  method: 'LIST' | 'CREATE' | 'UPDATE' | 'DELETE' | 'CONNECTION',
  modelName: string,
  conflict = false,
) => {
  const decorators = [];
  decorators.push(ApiExtraModels(GenericResponse, model));
  const apiOkResponse = ApiOkResponse({
    description: `${modelName} ${method} TRANSACTION SUCCESSFULLY`,
    schema: {
      allOf: [
        { $ref: getSchemaPath(GenericResponse) },
        {
          properties: {
            payload: {
              type: 'array',
              items: { $ref: getSchemaPath(model) },
            },
          },
        },
      ],
    },
  });
  const apiCreatedResponse = ApiCreatedResponse({
    description: `${modelName} ${method} TRANSACTION SUCCESSFULLY`,
    schema: {
      allOf: [
        { $ref: getSchemaPath(GenericResponse) },
        {
          properties: {
            payload: {
              type: 'object',
              $ref: getSchemaPath(model),
            },
          },
        },
      ],
    },
  });
  const apiNotFoundResponse = ApiNotFoundResponse({
    description: `${modelName} NOT FOUND`,
    schema: {
      allOf: [{ $ref: getSchemaPath(GenericResponse) }],
    },
  });
  const apiConflictResponse = ApiConflictResponse({
    description: `${modelName} ALREAD EXIST`,
    schema: {
      allOf: [{ $ref: getSchemaPath(GenericResponse) }],
    },
  });
  const apiBadRequestResponse = ApiBadRequestResponse({
    description: `${modelName} COULDN'T ${method}`,
    schema: {
      allOf: [{ $ref: getSchemaPath(GenericResponse) }],
    },
  });
  switch (method) {
    case 'LIST':
      decorators.push(apiOkResponse, apiNotFoundResponse);
      break;
    case 'CREATE':
      decorators.push(
        apiCreatedResponse,
        apiNotFoundResponse,
        apiBadRequestResponse,
      );
      if (conflict) {
        decorators.push(apiConflictResponse);
      }
      break;
    case 'UPDATE':
      decorators.push(
        apiOkResponse,
        apiNotFoundResponse,
        apiBadRequestResponse,
      );
      if (conflict) {
        decorators.push(apiConflictResponse);
      }
      break;
    case 'DELETE':
      decorators.push(
        apiOkResponse,
        apiNotFoundResponse,
        apiBadRequestResponse,
      );
      break;
    case 'CONNECTION':
      decorators.push(apiOkResponse, apiBadRequestResponse);
      break;
    default:
      break;
  }
  return applyDecorators(...decorators);
};
