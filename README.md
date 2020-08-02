# HoneywellGameOfLife
Game of Life implemented as a completion assignment of Honeywell Hackathon

## Matrix Board Design
Spare Matrix is used for the live cells tracking. All rules are implemented on sparse matrix. 
To check for dead cells, only dead cells around live cells are check out. 
Sparse matrix is represented as a set of coordinates.
We can think in this way that for cells which are alive, we can directly check them.
For dead cells, only dead cells adjacent to live cells are capable of getting alive in the next iteration.
So, checking neighbourhood of alive cells only will help.

## UI Design
Designed in react using react-bootstrap and other react pre-build modules.

## Demo
A demo is added in the video named `Demo.mp4`
