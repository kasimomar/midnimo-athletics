# Image Sequence

Place your 89 WebP frames here, named sequentially with zero-padded
4-digit numbers, matching `FRAME_COUNT` and `FRAME_PATH` in
`components/ScrollyCanvas.tsx`:

```
frame_0000.webp
frame_0001.webp
frame_0002.webp
...
frame_0088.webp
```

Until real frames are added, `ScrollyCanvas` will simply show the
loading bar (missing images are counted as "loaded" so the UI doesn't
hang during development).

Tips for exporting a sequence:
- Export from After Effects / Blender / a 3D tool at a consistent
  aspect ratio (e.g. 1920x1080) and convert to WebP for small file size.
- 89 frames at ~80-150kb each keeps total payload reasonable
  (roughly 7-13MB). For production, consider lazy-loading frames in
  chunks instead of all at once.
