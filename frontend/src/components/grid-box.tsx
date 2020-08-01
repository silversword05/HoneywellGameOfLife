import React from 'react';
import '../App.css';


type GridBoxProps = {
    noOfSquares: number;
    aliveGrids: { "x": number, "y": number }[];
    addAliveGrids: (x: number, y: number) => void;
}

export default class GridBox extends React.Component<GridBoxProps> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: GridBoxProps) {
        super(props);
        this.formgrid = this.formgrid.bind(this);
    }

    formgrid() {
        const grid = [];
        for (let y = 0; y < this.props.noOfSquares; y++) {
            for (let x = 0; x < this.props.noOfSquares; x++) {
                grid.push({"x": x, "y": y});
            }
        }
        return grid;
    }

    render() {
        // console.log("Snake Grid");
        const space = (100.0 / this.props.noOfSquares).toString() + "%";
        return (
            <div className="snake-container">
                <div className="grid">{
                    this.formgrid().map((grid) => {
                        var backgroundColor: string;
                        if (this.props.aliveGrids.some((value) => {
                            return (value.x === grid.x && value.y === grid.y);
                        }))
                            backgroundColor = "black";
                        else backgroundColor = "white";
                        return (
                            <div
                                style={{width: space, height: space, backgroundColor: backgroundColor}}
                                key={grid.x.toString() + '-' + grid.y.toString()}
                                className="grid-item"
                                onClick={(event) => {
                                    this.props.addAliveGrids(grid.x + 1, grid.y + 1)
                                }}
                            />
                        );
                    })
                }</div>
            </div>
        );
    }
}