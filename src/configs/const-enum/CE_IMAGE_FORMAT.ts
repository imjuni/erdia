/**
 * ER diagram export image file format
 *
 * @format image
 *
 * - svg: svg image format
 * - png: png image format
 * */
export const CE_IMAGE_FORMAT = {
  SVG: 'svg',
  PNG: 'png',
} as const;

export type CE_IMAGE_FORMAT = (typeof CE_IMAGE_FORMAT)[keyof typeof CE_IMAGE_FORMAT];
