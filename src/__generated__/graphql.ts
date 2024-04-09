/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Bookmark = {
  __typename?: 'Bookmark';
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type BookmarkFilter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_neq?: InputMaybe<Scalars['ID']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_neq?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_neq?: InputMaybe<Scalars['String']['input']>;
};

export type BookmarkInput = {
  isRead: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type ListMetadata = {
  __typename?: 'ListMetadata';
  count?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark?: Maybe<Bookmark>;
  createManyBookmark?: Maybe<Array<Maybe<Bookmark>>>;
  removeBookmark?: Maybe<Bookmark>;
  updateBookmark?: Maybe<Bookmark>;
};


export type MutationCreateBookmarkArgs = {
  isRead: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};


export type MutationCreateManyBookmarkArgs = {
  data?: InputMaybe<Array<InputMaybe<BookmarkInput>>>;
};


export type MutationRemoveBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBookmarkArgs = {
  id: Scalars['ID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  Bookmark?: Maybe<Bookmark>;
  _allBookmarksMeta?: Maybe<ListMetadata>;
  allBookmarks?: Maybe<Array<Maybe<Bookmark>>>;
};


export type QueryBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type Query_AllBookmarksMetaArgs = {
  filter?: InputMaybe<BookmarkFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllBookmarksArgs = {
  filter?: InputMaybe<BookmarkFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};

export type AllBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBookmarksQuery = { __typename?: 'Query', allBookmarks?: Array<{ __typename?: 'Bookmark', id: string, title: string, url: string, isRead: boolean } | null> | null };

export type ChangeReadFlagMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  isRead: Scalars['Boolean']['input'];
}>;


export type ChangeReadFlagMutation = { __typename?: 'Mutation', updateBookmark?: { __typename?: 'Bookmark', id: string, isRead: boolean } | null };

export type RemoveBookmarkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveBookmarkMutation = { __typename?: 'Mutation', removeBookmark?: { __typename?: 'Bookmark', id: string } | null };


export const AllBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllBookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allBookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortField"},"value":{"kind":"StringValue","value":"isRead","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"StringValue","value":"ASC","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}}]}}]}}]} as unknown as DocumentNode<AllBookmarksQuery, AllBookmarksQueryVariables>;
export const ChangeReadFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeReadFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isRead"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"isRead"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isRead"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isRead"}}]}}]}}]} as unknown as DocumentNode<ChangeReadFlagMutation, ChangeReadFlagMutationVariables>;
export const RemoveBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveBookmarkMutation, RemoveBookmarkMutationVariables>;