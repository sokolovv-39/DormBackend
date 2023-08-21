import { PickType } from "@nestjs/swagger";
import { UpdateUserDto } from "./update-user.dto";

export class TakeTimeDto extends PickType(UpdateUserDto, ['email', 'recordDatetime'] as const){}