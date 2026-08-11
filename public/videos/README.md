# Videos Folder - Self-Hosted Players

## Structure
```
videos/
├── philosophy/     # index.html carousel videos
│   ├── 01-innovation.mp4
│   ├── 02-sustainability.mp4
│   ├── 03-human-centric.mp4
│   ├── 04-craftsmanship.mp4
│   └── 05-legacy.mp4
├── projects/       # Project showcase
├── services/       # Service explainers
├── team/           # Team intros
└── index.html      # Demo player
```

## Download YouTube Videos (Recommended)
### Windows (Python)
1. Install yt-dlp: `pip install yt-dlp`
2. Download philosophy carousel videos:
```
yt-dlp -f 'best[height<=720]' "https://youtube.com/watch?v=YEFR-Ay9BX8" -o "videos/philosophy/01-innovation.%(ext)s"
yt-dlp -f 'best[height<=720]' "https://youtube.com/watch?v=beUzEqtOAUc" -o "videos/philosophy/02-sustainability.%(ext)s"
yt-dlp -f 'best[height<=720]' "https://youtube.com/watch?v=jV1v2NNEdVw" -o "videos/philosophy/03-human-centric.%(ext)s"
yt-dlp -f 'best[height<=720]' "https://youtube.com/watch?v=8bKffrD0Q0k" -o "videos/philosophy/04-craftsmanship.%(ext)s"
yt-dlp -f 'best[height<=720]' "https://youtube.com/watch?v=7KMM5gD6eG4" -o "videos/philosophy/05-legacy.%(ext)s"
```
3. Convert to WebM (optional, smaller): `ffmpeg -i input.mp4 -c:v libvpx-vp9 output.webm`

### Browser (Online)
- y2mate.com, savefrom.net (quality loss)

## Usage
1. Place MP4/WebM in matching subfolder
2. Reload index.html → Auto-detects/swaps YouTube to local
3. Features:
   - Sticky overlay player (scroll works)
   - Auto-advance carousel (video1 end → video2)
   - Responsive, mobile-first
   - Fallback to YouTube

## Test Demo
Open `videos/index.html` for standalone player test.

## File Naming
- `01-innovation.mp4` (exact match data-video-id names)

