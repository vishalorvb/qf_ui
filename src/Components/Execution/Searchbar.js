import { useEffect, useState } from "react";
const Searchbar = ({items}) => {
    console.log(items)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [itemSetter, setItemSetter] = useState([])

     const handleChange = event => {
        setSearchTerm(event.target.value);
        console.log(event.target.value)
    };
    // useEffect(() => {
    //     console.log(items)
    //     const results = items?.filter(deivce =>
    //         {
    //             console.log(deivce.name)
    //         deivce.name.toLowerCase().includes(searchTerm)
    //         }
    //     );
    //     console.log(results)
    //     setSearchResults(results);
    // }, [searchTerm]);

    return (
        <div>
            {/* <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            /> */}
            <ul>
                {searchResults?.map(item => (
                    <li key={item.testcase_id}>{items}</li>
                ))}
            </ul>
        </div>
    );
}
export default Searchbar;