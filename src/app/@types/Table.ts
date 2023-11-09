declare type Header = {
  id: string,
  name: string,
  sortable?: boolean
}

declare type Row = {
  [key:string]: any
}

declare type DefaultSorting = {
  headerId: string,
  desc?: boolean,
}

