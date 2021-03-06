import React from 'react';
import WillDisplay from './WillDisplay';

type WillState = {
    activity: string,
    type: string
}

type WillProps = {

}

class Will extends React.Component<WillProps, WillState> {
    constructor(props: WillProps) {
        super(props)

        this.state = {
            activity: '',
            type: ''
        }
    }

    // handleSubmit(event) {
    //     event.preventDefault();

    componentDidMount() {
        console.log("record found");

        fetch(`https://www.boredapi.com/api/activity/`)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    activity: json.activity,
                    type: json.type,
                })
                console.log(this.state.activity);
                console.log(this.state.type);
            });
    }
    // }
//
    render() {
        return (
            <div>
                <WillDisplay activity={this.state.activity} type={this.state.type} />
            </div>
        )
    }
}

export default Will;


