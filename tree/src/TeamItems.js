import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { countLineParams } from "./utils";
import { Grow } from "@mui/material";

export const TeamItem = ({
    items,
    hasParent = false,
    level = 0,
    onItemClick,
    selectedPath,
    active = false,
    onItemAdd, 
    itemNode: Component,
    marginBottomDefault = 7,
    itemHeightDefault = 46,
    searchItemPath,

}) => {
    // const [draggedOverId, setDraggedOverId] = useState(null)
    const { length } = items;
    const isRoot = level === 0;

    const handleClick = (event, item) => {
        event.stopPropagation();
        onItemClick(item);
    };

    
    return items.map((item, index) => {
        const { id } = item;
        const hasItemBelow = index < length - 1;
        const childrenCount = item.children && item.children.length;
        const { top, height } = countLineParams(
            item,
            index,
            hasItemBelow,
            marginBottomDefault,
            itemHeightDefault
        );
        // Getting the id, index of the selected path (clicked/focused node)
        const { id: activeId, index: activeIndex } = selectedPath[level] || {};
        const isActive = id === activeId;
        // It should be allowed to be dragged if all items are draggable, if not, only leafs are allowed to.
        let marginBottom = marginBottomDefault;
        // if it is the last node in the tree, no need for additional margin!
        if (index === items.length - 1) {
            marginBottom = 0;
        }

        // if it is the root node, add additional margin below it.
        if (!level) {
            marginBottom = marginBottomDefault * 2;
        }
        // console.log({item: item.name, level})

        return (
            <div className="item" key={id} style={{ marginBottom }}>
                <Grow in={true} timeout={500 + index * 200}>
                    <div
                        className={classNames("item__parent", {
                            active: isActive
                        })}
                    >
                        {/* if the node has indeed some children below it and its not the root one. add the class that will take care of displaying the neccessary lines */}
                        {!isRoot && hasItemBelow && (
                            <div
                                className={classNames("item__parent__line", {
                                    active: active && index < activeIndex
                                })}
                                style={{ top, height }}
                            />
                        )}
                        <div
                            onClick={(event) => handleClick(event, item)}
                            className={classNames("item__parent__element", {
                                "has-children": childrenCount,
                                "has-parent": hasParent,
                                "no-active-children": level === selectedPath.length - 1
                            })}
                            style={{ height: itemHeightDefault, position: "relative"}}
                        >
                            <div onClick={(e) => {e.stopPropagation(); onItemAdd(item);}} style={{color: "white", width: 20, height: 20, position: "absolute", top: -10, right: -10, backgroundColor: "green", borderRadius: "1em", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}}>
                                +
                            </div>
                            <Component
                                item={item}
                                isParent={childrenCount > 0}
                                onClick={() => {
                                    
                                }}
                            />
                        </div>
                    </div>
                </Grow>
                <div
                    id={id}
                    // style={{ backgroundColor: id === draggedOverId ? 'aliceblue' : null }}
                    className="item__children"
                   
                >
                    {/* If there is more children, recursively call the same function  */}
                    {childrenCount > 0 && (
                        <TeamItem
                            items={item.children}
                            hasParent
                            level={level + 1}
                            onItemAdd={onItemAdd}
                            onItemClick={onItemClick}
                            selectedPath={selectedPath}
                            active={isActive}
                            itemNode={Component}
                            marginBottomDefault={marginBottomDefault}
                            itemHeightDefault={itemHeightDefault}
                            searchItemPath={searchItemPath}
                          
                        />
                    )}
                </div>
            </div>
        );
    });
};

TeamItem.propTypes = {
    items: PropTypes.array,
    hasParent: PropTypes.bool
};
