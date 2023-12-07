export const UI_PATHS = {
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  HOME: "/",
  EDIT_MAP: "/edit/:mapId",
  VIEW_MAP: "/view/:mapId",
};

export const API_PATHS = {
  SIGN_IN: "/auth",
  SIGN_OUT: "/auth/sign-out",
  SIGN_UP: "/auth/sign-up",
  REFRESH_TOKENS: "/auth/refresh",
  GET_USER_MAPS: "/maps",
  CREATE_MAP: "/maps",
  EDIT_MAP: "/edit",
  GET_MAP: "/maps/:mapId",
  GET_MAP_VIEW: "/maps/:mapId/view",
  DELETE_MAP: "/maps/:mapId",
  UPDATE_MAP: "/maps/:mapId",
  SAVE_MARKER: "/markers",
  DELETE_MARKER: "/markers/:markerId?mapId=:mapId",
  UPDATE_MARKER: "/markers/:markerId?mapId=:mapId",
  INVITE_COLLABORATOR: "/collaborators",
  CREATE_LAYER: "/layers?mapId=:mapId",
  PATCH_LAYER: "/layers/:layerId?mapId=:mapId",
  DELETE_LAYER: "/layers/:layerId?mapId=:mapId",
};
