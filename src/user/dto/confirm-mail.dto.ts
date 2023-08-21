import { Dormitory } from "src/dormitory/entity/dormitory.entity"

export class ConfirmMailDto {
    email: string
    recordDatetime: string;
    dormitory: Dormitory
    contacts: {fullname: string, position: string, phone: string}[]
}