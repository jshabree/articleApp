import * as Types from "./types";

export const getArticlesList = (result) => ({
  type: Types.ARTICLE_LIST,
  result,
});
