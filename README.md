# supabase-event-store
An Event Store implemented atop Supabase


## Planned features

- [ ] Event Store
  - [ ] Append events to stream
  - [ ] Read events from stream
  - [ ] Subscribe to events from stream

- [ ] Example app (Commercial Location Spotter)
  - [x] Shows map centered at current device geolocation
  - [ ] Shows surrounding previously spotted locations on map
  - [ ] Allows adding a new commercial location
    - [ ] Capture Geolocation
    - [ ] Take picture
    - [ ] Input Street Address
    - [ ] Input free description


## Infra Stack

- Supabase
  - DB (Events and Read Views)
  - Realtime (Event Subscriptions)
  - Storage (Location pictures)
  - Auth
- Fly.io
  - Nodejs Docker container (App Event Store and command and event processors)
- Vercel
  - Nextjs App Front End