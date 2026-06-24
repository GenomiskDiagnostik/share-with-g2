# Send to G2 v0.2.18 – persistent/larger snapshot view

Changes:

- Keeps the last good glasses snapshot visible when `/screen-snapshot` intermittently returns 404/network errors.
- Stops replacing the glasses snapshot state with “No local connection” after a frame has already been rendered.
- Polling interval changed from 500 ms to 1000 ms to match the observed producer cadence and reduce BLE/API churn.
- Removes the explanatory snapshot text from the glasses ready state; only the image remains.
- Centers the maximum single G2 image container (288×144) vertically on the glasses display.
- Disables image smoothing in canvas preprocessing to preserve more UI/text contrast on the low-resolution display.

Note: full 576×288 rendering would require tiled image containers. That is possible, but would likely reduce update frequency because each image tile must be transferred serially over the G2 image pipeline.
