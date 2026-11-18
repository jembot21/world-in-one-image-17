# The Daily Globe — 17 November 2026 in one image

The Daily Globe is a newspaper front page summarizing the world news of Tuesday 17 November 2026 for the make.fun bounty “Sum up 17 November’s world news in one image.” [news-image-20261117](https://make.fun/bounty/news-image-20261117)

## Front page

- **Lead** — Ukraine smashes the Crimean Bridge, with coverage of the toll in Zaporizhzhia.
- **Middle East** — Iran fires drones at a U.S. radar in Bahrain, and tanker mining escalates tensions in the Strait of Hormuz.
- **Asia · Japan** — Japan scrambles jets over a Russian airspace breach, and Moldova closes its airspace.
- **Markets** — The Dow drops 1,000 points intraday.
- **Indonesia** — A police general is fired in the presidential wiretap scandal.
- **Asia Summits** — Trump is in Manila as the Shenzhen trilateral looms.
- **Health** — The U.S. loses measles-free status after 26 years.
- **Climate · COP31** — A draft deal demands a faster fossil fuel phase-out.
- **Disaster** — A Russian military plane crash kills 19, and a Bulgarian tanker sinks.
- **Science · Space** — Earth gains minimoon 2026 QQ8, with updates on ESA’s Hera and NASA’s Terra.
- **IN BRIEF** — A column of 12 short news items.

The front page was hand-set in HTML and CSS and rendered as a PNG at exactly 1024×1024 pixels.

## Run it

From the repository root, run with Node.js 22.

```sh
node main.ts
```

The program writes `/output/entry.png` by default. Set `MAKEFUN_OUTPUT_DIR` to override the destination.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/globe-out node main.ts
```

`main.ts` checks the eight-byte PNG signature, the IHDR dimensions (1024×1024), and the 1 MiB size limit (1,048,576 bytes). It creates the destination directory, copies the image, reads it back to verify the byte length, and logs the size and dimensions.
