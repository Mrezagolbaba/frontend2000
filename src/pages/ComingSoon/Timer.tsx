import React, { Component } from "react";
import "./timer.scss";

interface State {
  days: string;
  minutes: string;
  hours: string;
  seconds: string;
  time_up: string;
}

class CountDown extends Component<Record<string, never>, State> {
  private x: NodeJS.Timeout | null = null;
  private deadline: number | null = null;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      days: "0",
      minutes: "0",
      hours: "0",
      seconds: "0",
      time_up: "",
    };
  }

  private count() {
    const now = new Date().getTime();
    const t = this.deadline! - now;
    const dd = Math.floor(t / (1000 * 60 * 60 * 24));
    const hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    const ss = Math.floor((t % (1000 * 60)) / 1000);

    const days = dd < 10 ? "0" + dd : dd.toString();
    const hours = hh < 10 ? "0" + hh : hh.toString();
    const minutes = mm < 10 ? "0" + mm : mm.toString();
    const seconds = ss < 10 ? "0" + ss : ss.toString();

    this.setState({ days, minutes, hours, seconds });

    if (t < 0) {
      clearInterval(this.x!);
      this.setState({
        days: "0",
        minutes: "0",
        hours: "0",
        seconds: "0",
        time_up: "TIME IS UP",
      });
    }
  }

  componentDidMount() {
    this.deadline = new Date("Sep 30, 2023 21:00:00").getTime();

    this.x = setInterval(() => this.count(), 1000);
  }

  render() {
    const { days, seconds, hours, minutes } = this.state;
    return (
      <div id="countdown">
        <div className="col-4">
          <div className="box">
            <p id="day">{days}</p>
            <span className="text">Days</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="hour">{hours}</p>
            <span className="text">Hours</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="minute">{minutes}</p>
            <span className="text">Minutes</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="second">{seconds}</p>
            <span className="text">Seconds</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;
