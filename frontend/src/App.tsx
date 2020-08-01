import React from 'react';
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Container from "react-bootstrap/cjs/Container";
import GridControlsBox from "./components/grid-controls-box";
import PanelControlBox from "./components/panel-control-box";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {url} from "inspector";

type AppProps = {}

type AppStates = {
    xOffset: number;
    yOffset: number;
    aliveGrids: { "x": number, "y": number }[];
    iterationCount: number;
    inputPhase: boolean;
    iterationStep: number;
    repeatCount: number;
};


export default class App extends React.Component<AppProps, AppStates> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: AppProps) {
        super(props);
        this.state = {
            xOffset: 0,
            yOffset: 0,
            aliveGrids: new Array<{ "x": number, "y": number }>(),
            iterationCount: 0,
            inputPhase: true,
            iterationStep: 1,
            repeatCount: 0,
        };
        this.setOffset = this.setOffset.bind(this);
        this.addAliveGrids = this.addAliveGrids.bind(this);
        this.reOriginateAliveGrids = this.reOriginateAliveGrids.bind(this);
        this.setInputPhase = this.setInputPhase.bind(this);
        this.initializeGame = this.initializeGame.bind(this);
        this.iterateGame = this.iterateGame.bind(this);
        this.refreshGame = this.refreshGame.bind(this);
    }

    setOffset(xOffsetChange: number, yOffsetChange: number) {
        console.log("X-offset", xOffsetChange, "Y-offset", yOffsetChange);
        let currentXOffset = this.state.xOffset;
        let currentYOffset = this.state.yOffset;
        this.setState({
            xOffset: currentXOffset + xOffsetChange,
            yOffset: currentYOffset + yOffsetChange,
        });
    }

    reOriginateAliveGrids() {
        let newAliveGrids = new Array<{ "x": number, "y": number }>();
        this.state.aliveGrids.map((value) => {
            newAliveGrids.push({"x": value.x - this.state.xOffset, "y": value.y - this.state.yOffset});
            return null;
        });
        return newAliveGrids;
    }

    addAliveGrids(x: number, y: number) {
        console.log("Grid click", x, y);
        if (!this.state.inputPhase) return;
        let currentAliveGrids = Array.from(this.state.aliveGrids);
        if (currentAliveGrids.some((value) => (value.x === x && value.y === y)))
            currentAliveGrids = currentAliveGrids.filter((value) => !(value.x === x && value.y === y));
        else
            currentAliveGrids.push({"x": x + this.state.xOffset, "y": y + this.state.yOffset});
        this.setState({
            aliveGrids: currentAliveGrids,
        });
    }

    setInputPhase(val: boolean) {
        console.log("Input Phase", val);
        this.setState({
            inputPhase: val,
        });
    }

    initializeGame() {
        let formData = new FormData();
        if (!this.state.inputPhase) {
            alert("Game already initialized !!");
            return;
        }
        this.setInputPhase(false);
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append("data", JSON.stringify(this.state.aliveGrids));
        console.log("Form Data", formData);
        axios.post('http://127.0.0.1:5000/initialize', formData, config)
            .then(res => {
                console.log("Initialize", res);
                if (!res['data'].status)
                    alert("Sorry, no initialization");
                else alert("Game Initialized!! Start to play");
            });
    }

    iterateGame(repeat: number = 0) {
        if (this.state.inputPhase) {
            alert('Initialize the Game first');
            return;
        }

        let url: string;
        if (repeat === 0 || repeat === 1)
            url = 'http://127.0.0.1:5000/iterate';
        else url = 'http://127.0.0.1:5000/iterate/' + repeat.toString();

        axios.get(url)
            .then(res => {
                console.log("Iterate", res);
                let data = res['data'];
                if (!data.status) {
                    alert('Sorry, unable to update');
                } else {
                    let newAlives = new Array<{ "x": number, "y": number }>();
                    let newIterationCount: number;
                    if (repeat === 0 || repeat === 1)
                        newIterationCount = this.state.iterationCount + 1;
                    else newIterationCount = this.state.iterationCount + repeat;
                    data['data'].map((value: { x: number, y: number }) => {
                        newAlives.push({"x": value.x, "y": value.y});
                        return null;
                    });
                    console.log("New Alives", newAlives);
                    this.setState({
                        aliveGrids: newAlives,
                        iterationCount: newIterationCount,
                    });
                }
            })
    }

    refreshGame() {
        alert('Refreshing game');
        this.setInputPhase(true);
        this.setState({
            xOffset: 0,
            yOffset: 0,
            aliveGrids: new Array<{ "x": number, "y": number }>(),
            iterationCount: 0,
            iterationStep: 1,
        });
        axios.get('http://127.0.0.1:5000/refresh')
            .then(res => {
                console.log("Refresh", res);
            });
    }

    render() {
        return (
            <Container fluid className="container_style">
                <Row className="row-style-center">
                    <Col md={8}>
                        <GridControlsBox
                            aliveGrids={this.reOriginateAliveGrids()}
                            offSetChange={this.setOffset}
                            addAliveGrids={this.addAliveGrids}
                        />
                    </Col>
                    <Col md={4}>
                        <PanelControlBox
                            xRange={{"min": 1 + this.state.xOffset, "max": 25 + this.state.xOffset}}
                            yRange={{"min": 1 + this.state.yOffset, "max": 25 + this.state.yOffset}}
                            totalAlive={this.state.aliveGrids.length}
                            iterationCount={this.state.iterationCount}
                            setStart={this.initializeGame}
                            setIterate={this.iterateGame}
                            setRefresh={this.refreshGame}
                            inputPhase={this.state.inputPhase}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}