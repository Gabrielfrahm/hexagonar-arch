export interface UseCase {
  execute(command: any): Promise<any>
}
