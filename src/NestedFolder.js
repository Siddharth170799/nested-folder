import { useState } from "react";
import { data } from "./data";
import "./NestedFolder.css";
import { toast } from "sonner";

const DisplayFolder = ({ data, addFolder, deleteFolder }) => {
  const [isExpanded, setIsExpanded] = useState({});

  const toggleExpand = (name) => {
    setIsExpanded((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };
  return (
    <div className="nested-folder__list">
      {data?.map((item) => {
        const hasChildren = item?.children?.length > 0;
        const expanded = isExpanded[item.name];
        return (
          <div
            className={`nested-folder__item ${hasChildren ? "has-children" : ""}`}
            key={item.id}
          >
            <div className="nested-folder__row">
              {item.isFolder && (
                <span
                  className="nested-folder__arrow"
                  onClick={() => {
                    toggleExpand(item.name);
                  }}
                  title={expanded ? "Collapse folder" : "Expand folder"}
                >
                  {expanded ? "▲" : "▼"}
                </span>
              )}

              {item?.isFolder && (
                <span className="nested-folder__icon">📁</span>
              )}
              <p className="nested-folder__name">{item.name}</p>

              {item.isFolder && (
                <>
                  <span
                    className="nested-folder__toggle add"
                    onClick={() => {
                      addFolder(item.id);
                    }}
                    title="Add subfolder"
                  >
                    +
                  </span>
                  <span
                    className="nested-folder__toggle remove"
                    onClick={() => deleteFolder(item.id)}
                    title="Delete folder"
                  >
                    −
                  </span>
                </>
              )}
            </div>

            {hasChildren && expanded && (
              <DisplayFolder
                addFolder={addFolder}
                deleteFolder={deleteFolder}
                data={item.children}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const NestedFolder = () => {
  const [folderData, setFolderData] = useState(data);

  const addFolder = (id) => {
    const name = prompt("Enter Folder Name");
    if (!name) return;

    toast.success("Folder added successfully!");

    function addToFolders(folders) {
      return folders.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            children: [
              ...(item.children || []),
              {
                id: Math.random(),
                isFolder: true,
                children: [],
                name,
              },
            ],
          };
        } else if (item.children) {
          return { ...item, children: addToFolders(item.children) };
        }
        return item;
      });
    }

    setFolderData(addToFolders(folderData));
  };

  const deleteFolder = (id) => {
    function removeFolder(folders) {
      return folders
        .filter((item) => item.id !== id)
        .map((item) =>
          item.children
            ? { ...item, children: removeFolder(item.children) }
            : item,
        );
    }

    setFolderData(removeFolder(folderData));
  };

  return (
    <div className="nested-folder-wrapper">
      <h2 className="nested-folder-heading">📂 Nested Folder Structure</h2>
      <div className="nested-folder">
        <DisplayFolder
          data={folderData}
          addFolder={addFolder}
          deleteFolder={deleteFolder}
        />
      </div>
    </div>
  );
};

export default NestedFolder;
