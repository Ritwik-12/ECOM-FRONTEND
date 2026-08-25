import { Button, FormControl, Tooltip } from '@mui/material';
import {useState,useEffect} from 'react';
import {FiArrowDown, FiArrowUp, FiRefreshCcw, FiSearch} from "react-icons/fi";
import {InputLabel} from '@mui/material';
import {Select} from '@mui/material';
import { MenuItem } from '@mui/material';

import {useSearchParams,useLocation,useNavigate} from 'react-router-dom'

const Filter=({categories})=>{

   
    const [searchParams]= useSearchParams();
    const params=new URLSearchParams(searchParams);
    const pathname=useLocation().pathname;
    const navigate= useNavigate();

    const [category,setCategory]=useState("all");
    const [sortOrder,setSortOrder] =useState("asc");
    const [searchTerm,setSearchTerm]= useState("");


   useEffect(()=>{

        const currentCategory= searchParams.get("category") || "all";
        const currentSortOrder= searchParams.get("sortBy") ||  "asc";
        const currentSearchTerm= searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
        
   },[searchParams]);


   useEffect(()=>{
    const handler=setTimeout(()=>{
        if(searchTerm){
            searchParams.set("keyword",searchTerm);
        }else{
            searchParams.delete("keyword");
        }
        navigate(`${pathname}?${searchParams.toString()}`);
    },700);

    return ()=>{
        clearTimeout(handler);

    };
   },[searchParams,searchTerm,navigate,pathname]);


    const handleCategoryChange=(event)=>{
        const selectedCategory=event.target.value;
        if(selectedCategory === "all"){
            params.delete("category");
        }else{
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params}`);
        setCategory(event.target.value);
    };


    const toggleSortOrder=()=>{

            setSortOrder((prevOrder)=>{
               const newOrder= (prevOrder === "asc")? "desc" : "asc";
               params.set("sortby",newOrder);
               navigate(`${pathname}?${params}`);
               return newOrder;
            })

    };


    const handleClearFilters=()=>{
            navigate({pathname: window.location.pathname});
    };

    return(
            <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
                <div className="relative flex items-center 2xl:w-112.5 sm:w-105 w-full">
                    <input
                        type="text"
                        placeholder="Search products...."
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
                    />
                    <FiSearch className="absolute left-3 text-slate-800 size={20}"/>
                </div>
                <div className="flex lg:flex-row flex-col gap-4 items-center">
                    <FormControl
                        className="text-slate-800 border-slate-700"
                        variant="outlined"
                        size="small"
                    >
                        <InputLabel
                         id="category-select-label"
                        >Category</InputLabel>
                        <Select
                         labelId="category-select-label"
                         value={category}
                         onChange={handleCategoryChange}
                         label="Category"
                         className="min-w-30 text-slate-800 border-slate-700"

                        >
                                <MenuItem value="all">All</MenuItem>
                                {
                                    categories.map((cat)=>(
                                       <MenuItem key={cat.categoryId} value={cat.categoryName}>
                                           {cat.categoryName}
                                       </MenuItem>     
                                    ))
                                }
                        </Select>
                    </FormControl>

                    {/* sort button and clear filter */}
                    <Tooltip title="Sorted by price:asc">

                      <Button variant="contained" 
                       onClick={toggleSortOrder}
                      color="primary" className="flex items-center gap-2 h-10">
                         Sort By

                         {sortOrder === "asc"? (
                            <FiArrowUp size={20}/>
                            ):(
                                <FiArrowDown size={20} />
                            )
                        }
                        </Button> 
                    </Tooltip>
                    <button 
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 bg-rose-900 text-white px-2 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none">
                        <FiRefreshCcw className="font-semibold" size={16}/>
                        <span className="font-semibold">Clear Filter</span>
                    </button>
                </div>
            </div>

        
    );


};

export default Filter;