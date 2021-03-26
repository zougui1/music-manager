import { SchemaObject } from 'openapi3-ts'
import { IsString, IsUrl, IsInt, IsOptional } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class AddMusicBodyDTO {
  @IsString()
  @IsUrl()
  @IsOptional()
  link?: string;

  @IsInt()
  @IsOptional()
  playlistId?: number;
}

export const {
  AddMusicBodyDTO: addMusicBodySchema,
} = validationMetadatasToSchemas() as unknown as ISchemas;

interface ISchemas {
  AddMusicBodyDTO: SchemaObject;
}
