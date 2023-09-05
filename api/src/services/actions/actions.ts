import type {
  QueryResolvers,
  MutationResolvers,
  ActionRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const actions: QueryResolvers["actions"] = () => {
  return db.action.findMany();
};

export const action: QueryResolvers["action"] = ({ id }) => {
  return db.action.findUnique({
    where: { id },
  });
};

export const createAction: MutationResolvers["createAction"] = ({ input }) => {
  return db.action.create({
    data: input,
  });
};

export const updateAction: MutationResolvers["updateAction"] = ({
  id,
  input,
}) => {
  return db.action.update({
    data: input,
    where: { id },
  });
};

export const deleteAction: MutationResolvers["deleteAction"] = ({ id }) => {
  return db.action.delete({
    where: { id },
  });
};

export const Action: ActionRelationResolvers = {
  results: (_obj, { root }) => {
    return db.action.findUnique({ where: { id: root?.id } }).result();
  },
};
