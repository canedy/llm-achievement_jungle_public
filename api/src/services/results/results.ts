import type {
  QueryResolvers,
  MutationResolvers,
  ResultRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const results: QueryResolvers["results"] = () => {
  return db.result.findMany();
};

export const result: QueryResolvers["result"] = ({ id }) => {
  return db.result.findUnique({
    where: { id },
  });
};

export const createResult: MutationResolvers["createResult"] = ({ input }) => {
  return db.result.create({
    data: input,
  });
};

export const updateResult: MutationResolvers["updateResult"] = ({
  id,
  input,
}) => {
  return db.result.update({
    data: input,
    where: { id },
  });
};

export const deleteResult: MutationResolvers["deleteResult"] = ({ id }) => {
  return db.result.delete({
    where: { id },
  });
};

export const Result: ResultRelationResolvers = {
  actions: (_obj, { root }) => {
    return db.result.findUnique({ where: { id: root?.id } }).actions();
  },
  goal: (_obj, { root }) => {
    return db.result.findUnique({ where: { id: root?.id } }).goal();
  },
};
