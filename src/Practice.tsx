import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from 'react';
import Eco from './Eco'
import Header from './Header'
import PracticeBoard from './PracticeBoard'
import './Practice.css'

 interface PracticeProps extends RouteComponentProps, React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
}

interface PracticeState {
    item?: Eco
}

class Practice extends React.Component<PracticeProps, PracticeState> {      
    constructor(props: PracticeProps) {
        super(props);

        this.state = {
            item: undefined
        }
    }

    render(){ 
        return (
            <Route path="/practice" render={ () => 
                <div>
                    <Header title=""></Header>
                    <PracticeBoard id={ this.props.location.pathname.split("/")[2] }></PracticeBoard>
                </div>
            }/>
        )
    }

}
  
export default withRouter(Practice);