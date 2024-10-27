// renderer/src/components/ModelSelector.jsx
import React from 'react';

const ModelSelector = ({ selectedModel, onChangeModel }) => {
  const models = ['sonic-3.5', 'opus', 'iq']; // Add other models as needed

  return (
    <div className="model-selector">
      <label htmlFor="model-select">Model:</label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onChangeModel(e.target.value)}
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;