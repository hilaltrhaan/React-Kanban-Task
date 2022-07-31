import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable,} from "react-beautiful-dnd";
import './styles.css';
import uuid from "uuid/v4";
import axios from "axios";
import { VscChromeClose } from "react-icons/vsc";



const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]     : {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function App() {
    const [columns, setColumns] = useState([]);
    const [itemsFromBackend, setitemsFromBackend] = useState([]);

    useEffect(() => {
        getAllUser();
    }, [])

    const getAllUser = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/todos`).then(resp => {
            setitemsFromBackend(resp.data);
        });

    }

    const deleteTodo = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`).then((response) => {
            console.log("To do silindi")
            getAllUser();
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        setColumns({
            [uuid()]: {
                name: "Backlog",
                items: itemsFromBackend
            },
            [uuid()]: {
                name : "To do",
                items: []
            },
            [uuid()]: {
                name : "In Progress",
                items: [{
                    "id": "12",
                    "title": "Bookmarking",
                    "content": "Interface for when creating a new link note.",
                    "userId": 12
                }]
            },
            [uuid()]: {
                name : "Designed",
                items: []
            }
        })
    }, [itemsFromBackend])


    return (
        <div className="header">
          <h1>Roadmap</h1>
            <span>By Isaac N.C. Visit website</span>
    
        <div className="board">
            
          
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        
                        <div className="container"  key={columnId}>
                           
                           
                           
                            <div style={{ margin: 20 }}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            
                                            <div className="lists"
                                            
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                
                                            >
                                                <h2>{column.name}</h2>
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div className="cards"
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >  
                                                                    <div>
                                                                        <VscChromeClose style={{marginLeft:160}}
                                                                            onClick={() => {
                                                                                deleteTodo(item.id)
                                                                            }}
                                                                      
                                                                        />
                                                                        </div>
                                                                      
                                                                        <p className="cardTitle"> {item.title}</p>
                                                                        <p className="cardSubtitle">{item.content}</p>
                                                                    
                                                                    </div>
                                                                      
                                                                      
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
        </div>
    );
}

export default App;
