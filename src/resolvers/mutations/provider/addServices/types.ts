import { Service, Category } from "@prisma/client";

export interface IAddServiceArgs extends Service, Category {}
