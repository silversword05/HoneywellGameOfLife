import React from 'react';
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Container from "react-bootstrap/cjs/Container";
import Button from "react-bootstrap/cjs/Button";
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

type PanelControlBoxProps = {
    xRange: { "min": number, "max": number };
    yRange: { "min": number, "max": number };
    totalAlive: number;
    iterationCount: number;
    setStart: () => void;
    setIterate: (repeat: number) => void;
    setRefresh: () => void;
    inputPhase: boolean;
};

type PanelControlBoxState = {
    sliderStep: number,
}


export default class PanelControlBox extends React.Component<PanelControlBoxProps, PanelControlBoxState> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: PanelControlBoxProps) {
        super(props);
        this.state = {
            sliderStep: 1,
        };
        this.changeSliderState = this.changeSliderState.bind(this);
    }

    changeSliderState(val: number) {
        this.setState({
            sliderStep: val,
        });
    }

    render() {
        let iterateText = "";
        if (this.props.inputPhase)
            iterateText = "Input";
        else
            iterateText = this.props.iterationCount.toString();
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <h2>Panel Details</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="col-style-center">
                        <h3>X-Range</h3>
                    </Col>
                    <Col md={6} className="col-style-center">
                        <h3><b>{this.props.xRange.min}</b> - <b>{this.props.xRange.max}</b></h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="col-style-center">
                        <h3>Y-Range</h3>
                    </Col>
                    <Col md={6} className="col-style-center">
                        <h3><b>{this.props.yRange.min}</b> - <b>{this.props.yRange.max}</b></h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="col-style-center">
                        <h3>Total Alive</h3>
                    </Col>
                    <Col md={6} className="col-style-center">
                        <h3><b>{this.props.totalAlive}</b></h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="col-style-center">
                        <h3>Iteration Count</h3>
                    </Col>
                    <Col md={6} className="col-style-center">
                        {}
                        <h3><b>{iterateText}</b></h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className="col-style-center slider-box">
                        <Slider
                            axis='x'
                            xmax={10}
                            xmin={1}
                            xstep={1}
                            x={this.state.sliderStep}
                            onChange={(values) => this.changeSliderState(values.x)}
                            styles={{
                                thumb: {
                                    backgroundColor: 'black',
                                }
                            }}
                        />
                    </Col>
                    <Col md={6} className="col-style-center ">
                        <h3>Step: <b>{this.state.sliderStep}</b></h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 2, offset: 3}} className="col-style-center">
                        <Button variant="success" onClick={(event) => this.props.setStart()}>Start</Button>
                    </Col>
                    <Col md={2} className="col-style-center">
                        <Button variant="primary"
                                onClick={(event) => this.props.setIterate(this.state.sliderStep)}>Next</Button>
                    </Col>
                    <Col md={{span: 2}} className="col-style-center">
                        <Button variant="danger" onClick={(event) => this.props.setRefresh()}>Refresh</Button>
                    </Col>
                    <Col md={3}> </Col>
                </Row>
            </Container>
        );
    }
}