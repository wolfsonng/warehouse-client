export type DatabaseOption = 'oracle/MAdbtrain' | 'oracle/AAIdbtrain' | 'postgres/db1' | 'postgres/db2';
export type WildcardOption = '%keyword%' | '%keyword' | 'keyword%' | 'keyword';
export type SearchType = 'column' | 'table' | 'wildcard_table';

export interface SearchParams {
  database: DatabaseOption;
  keyword: string;
  wildcard: WildcardOption;
  search_type: SearchType;
}

export interface SearchResult {
  value: string;
  associatedData?: string;
}

export interface SearchResponse {
  db_type: string;
  db_key: string;
  results: SearchResult[];
}