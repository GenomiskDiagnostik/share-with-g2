# Send to G2 v0.2.21 - HUD cleanup and read-state fix

Changes:
- Removed the left G2/battery-like label from the glasses HUD.
- Removed the SEND TO G2 prefix from the HUD title; title now shows only the localized shared inbox title and selected item counter.
- Header counter now shows selected inbox item / total inbox items instead of menu page / menu page count.
- Reduced card heights by roughly 25% and moved them lower to avoid crowding the title.
- Capitalized read-state labels in Danish/English.
- Opening an inbox item now marks it as read through the local API and updates local state, so [Læst]/[Ulæst] should no longer stay permanently unread after opening.
