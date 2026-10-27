# Recording details

This material records two actual Unity 6000.0.58f2 Editor windows using EZ Scene Collab Full Edition. The Editors connect over TCP on the same Windows computer. An isolated demo harness drives the scene edits through the original product APIs. All 158 package files in both demo projects match the original source and the saved SHA-256 baseline.

The Unity interface, selections, gizmos, participants, ownership indicators and received scene changes come from the recording. No cursor, interface or receiving response was fabricated. The session begins with both Editors connected; it does not show the initial Host/Join button clicks.

All seven checks passed for the final take:

| Check | Result |
| --- | --- |
| Both TCP sessions connected; scene cameras enabled | Passed |
| Host bridge edit received by the client | Passed |
| Client pylon edit received by the host | Passed |
| Client-created beacon present in both Editors | Passed |
| Beacon scale received by the host | Passed |
| Bridge ownership passed from host to client | Passed |
| Client's continued bridge edit received by the host | Passed |

The source recording is 3840 x 1080, H.264, 30 fps, 2160 frames and 72 seconds. Only the two Unity windows were captured. Each Editor occupies one 1920 x 1080 half, with padding that preserves native proportions. The exports crop and alternate between these views, with the other scene shown in an inset.

The advertisement uses complete selected actions at 1.4x speed and an original instrumental soundtrack. The 65-second demo preserves the workflow's original timing; its cuts change which Editor is shown as the main view. Neither export contains microphone or desktop audio. The demo has no audio track.

This is an automated local demonstration. It does not measure physical LAN/VPN latency or demonstrate remote human teamwork, reconnect recovery, asset-file transfer or rejection of a conflicting selection. The camera-frustum overlay was disabled through the existing display control for the take and restored afterwards. Setup changes are confined to the demo projects.
