import { useId } from 'react';
import { useFilters } from '../hooks/useFilters';
import './Filters.css';

export function Filters() {
    const { filters, setFilters } = useFilters();

    const minPriceFilterId = useId();
    const categoryFilterId = useId();
    const handleChange = (event) => {
        setFilters((prevState) => ({
            ...prevState,
            minPrice: event.target.value,
        }));
    };

    const handleChangeCategory = (event) => {
        setFilters((prevState) => ({
            ...prevState,
            category: event.target.value,
        }));
    };

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Precio a partir de: </label>
                <input
                    type="range"
                    id={minPriceFilterId}
                    min="0"
                    max="1000"
                    onChange={handleChange}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select
                    name="category"
                    id={categoryFilterId}
                    onChange={handleChangeCategory}
                >
                    <option value="all">Todas</option>
                    <option value="laptops">Portátiles</option>
                    <option value="smartphones">Móviles</option>
                    <option value="home-decoration">Decoración</option>
                </select>
            </div>
        </section>
    );
}
