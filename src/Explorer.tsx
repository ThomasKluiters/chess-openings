import React from 'react';
import { Col } from 'reactstrap'

export interface ExplorerProps extends React.HTMLProps<HTMLDivElement> {
    [key: string]: any;
    tag?: React.ReactType;
  }

class Explorer extends React.Component<ExplorerProps> {
    render() {
         return (
            <div className="md-form mt-0">
              <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
            </div>
        )
    }
}

export default Explorer;