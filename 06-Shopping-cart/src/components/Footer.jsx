import './Footer.css';
import { IS_DEVELOPMENT } from '../config';
import { useFilters } from '../hooks/useFilters';
import { useCart } from '../hooks/useCart';

export function Footer() {
    const { filters } = useFilters();
    const { cart } = useCart();
    return (
        <footer className="footer">
            <h4>Prueba técnica React</h4>
            <span>@ionatibia</span>
            <h5>Shopping Cart con useContext & useReducer</h5>
            {IS_DEVELOPMENT && JSON.stringify(filters, null, 2)}
            {IS_DEVELOPMENT && JSON.stringify(cart, null, 2)}
        </footer>
    );
}
