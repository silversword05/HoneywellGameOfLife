import React from 'react';
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Container from "react-bootstrap/cjs/Container";
import GridBox from "./grid-box";
import {ArrowUp, ArrowDown, ArrowRight, ArrowLeft} from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


type GridControlsBoxProps = {
    aliveGrids: { "x": number, "y": number }[];
    offSetChange: (xOffsetChange: number, yOffsetChange: number) => void;
    addAliveGrids: (x: number, y: number) => void;
}

export default class GridControlsBox extends React.Component<GridControlsBoxProps> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: GridControlsBoxProps) {
        super(props);
        this.rearrangedAliveGridCoordinate = this.rearrangedAliveGridCoordinate.bind(this);
    }

    rearrangedAliveGridCoordinate() {
        let grids = new Array<{ "x": number, "y": number }>();
        this.props.aliveGrids.map((value) => {
            grids.push({"x": value.x - 1, "y": value.y - 1});
            return null;
        });
        console.log("Alive Grids", grids);
        return grids;
    }

    render() {
        var gridCoordinate = this.rearrangedAliveGridCoordinate();
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 2, offset: 5}} className="col-style-center">
                        <ArrowUp color="royalblue" size={100} onClick={(event) => this.props.offSetChange(0, -25)}/>
                    </Col>
                </Row>
                <Row className="row-style-center">
                    <Col md={2} className="col-style-center">
                        <ArrowLeft color="royalblue" size={100} onClick={(event) => this.props.offSetChange(-25, 0)}/>
                    </Col>
                    <Col md={8}>
                        <GridBox
                            noOfSquares={25}
                            aliveGrids={gridCoordinate}
                            addAliveGrids={this.props.addAliveGrids}
                        />
                    </Col>
                    <Col md={2} className="col-style-center">
                        <ArrowRight color="royalblue" size={100} onClick={(event) => this.props.offSetChange(25, 0)}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 2, offset: 5}} className="col-style-center">
                        <ArrowDown color="royalblue" size={100} onClick={(event) => this.props.offSetChange(0, 25)}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}