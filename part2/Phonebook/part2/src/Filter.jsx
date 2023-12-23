const Filter = (props) => {
    return (
      <div>
        Filter shown with{' '}
        <input
          value={props.filterName}
          onChange={props.handleFilterChange} />
      </div>
    
    )
}
export default Filter  