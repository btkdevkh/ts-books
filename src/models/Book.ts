export interface IBook {
  id?: number;
  title: string;
  author: string;
  pages: number;
}

export class Book implements IBook {
  id: number = 0;
  title: string = ''
  author: string = ''
  pages: number = 0

  public static hydrateData(data: IBook): Book | null {
    let output = new Book()

    if(!data.id) {
      return null
    }

    output.id = data?.id ?? -1
    output.title = data.title ?? ''
    output.author = data.author ?? ''
    output.pages = data.pages ?? -1

    return output
  }
}
