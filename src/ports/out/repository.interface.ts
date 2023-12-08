export interface Repository<E> {
  create(entity: E): Promise<E | void>
  findAll(): Promise<E[] | void>
}
