import { RouteComponentProps } from 'react-router'
import Eco from '../Eco'

export default interface ExplorerLinkProps extends RouteComponentProps, React.HTMLProps<HTMLDivElement>  {
    [key: string]: any;
    tag?: React.ReactType;

    eco: Eco;
}
