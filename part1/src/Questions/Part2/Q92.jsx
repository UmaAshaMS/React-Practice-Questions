import React, { useState, useRef, useEffect } from "react";

export default function NestedCheckboxTree() {
  const initialData = [
    {
      id: 1,
      label: "Fruits",
      children: [
        { id: 2, label: "Apple" },
        { id: 3, label: "Banana" },
        { id: 4, label: "Orange" }
      ]
    },
    {
      id: 5,
      label: "Vegetables",
      children: [
        { id: 6, label: "Carrot" },
        { id: 7, label: "Potato" }
      ]
    }
  ];

  const [checked, setChecked] = useState({});

  // ---------- Toggle Node ----------
  const toggleNode = (node, isChecked) => {
    const updates = {};

    const updateChildren = (n) => {
      updates[n.id] = isChecked;
      n.children?.forEach(updateChildren);
    };

    updateChildren(node);

    setChecked(prev => ({
      ...prev,
      ...updates
    }));
  };

  // ---------- Calculate State ----------
  const getNodeState = (node) => {
    if (!node.children) {
      return {
        checked: !!checked[node.id],
        indeterminate: false
      };
    }

    const childStates = node.children.map(getNodeState);

    const allChecked = childStates.every(c => c.checked);
    const noneChecked = childStates.every(
      c => !c.checked && !c.indeterminate
    );

    return {
      checked: allChecked,
      indeterminate: !allChecked && !noneChecked
    };
  };

  // ---------- Recursive Node ----------
  const TreeNode = ({ node }) => {
    const checkboxRef = useRef(null);
    const state = getNodeState(node);

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate =
          state.indeterminate;
      }
    }, [state.indeterminate]);

    return (
      <div style={{ marginLeft: "20px" }}>
        <label>
          <input
            ref={checkboxRef}
            type="checkbox"
            checked={state.checked}
            onChange={(e) =>
              toggleNode(node, e.target.checked)
            }
          />
          {node.label}
        </label>

        {node.children?.map(child => (
          <TreeNode key={child.id} node={child} />
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h3>Nested Checkboxes</h3>

      {initialData.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: "20px"
  }
};