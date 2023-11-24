import React from 'react';
import { ParameterDictionaryInput } from './ParameterDictionaryInput';
import { Parameter } from '../Helpers/DataModel';

export const ParameterInput = ({
  parentParameter,
  parameter,
  onChange,
}: {
  parentParameter: Parameter | undefined;
  parameter: Parameter;
  onChange: (name: string, parameter: Parameter, value: any) => void;
}) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (parentParameter !== undefined) {
      onChange(
        parentParameter?.name + '.' + parameter.name,
        parameter,
        event.target?.value
      );
      return;
    }
    onChange(parameter.name, parameter, event.target?.value);
  };

  switch (parameter.componentType) {
    case 'text':
      return (
        <>
          {/* <h3 className="text-lg font-semibold mb-4">{parameter.name}</h3> */}
          <div className="mb-3">
            <label
              htmlFor="name"
              className="capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {parameter.name}
            </label>
            <input
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name={parameter.name}
              type="text"
              placeholder={parameter.name}
              onChange={handleInputChange}
              value={parameter.value ?? ''}
            />
          </div>
        </>
      );
    case 'boolean':
      return (
        <>
          {/* <h3 className="text-lg font-semibold mb-4">{parameter.name}</h3> */}
          <div>
            <label
              htmlFor="name"
              className="capitalize block text-sm font-medium text-gray-900"
            >
              {parameter.name}
            </label>
            <input
              id="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              name={parameter.name}
              type="checkbox"
              onChange={handleInputChange}
              value={parameter.value ?? false}
            />
          </div>
        </>
      );
    case 'list':
      return (
        <>
          {/* <h3 className="text-lg font-semibold mb-4">{parameter.name}</h3> */}
          <div>
            <label
              htmlFor="name"
              className="capitalize block  mb-2  text-sm font-medium text-gray-900"
            >
              {parameter.name}
            </label>
            <select
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name={parameter.name}
              onChange={handleInputChange}
              value={parameter.value ?? ''}
            >
              {parameter.list?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    case 'complex':
      return (
        <>
          <h3 className="capitalize  text-lg font-semibold mb-4">
            {parameter.name}
          </h3>
          <div className="w-full">
            {parameter.complex?.map((complexParameter) => (
              <ParameterInput
                key={complexParameter.name}
                parameter={complexParameter}
                onChange={onChange}
                parentParameter={parameter}
              />
            ))}
          </div>
        </>
      );
    case 'dictionary':
      return (
        <>
          <h3 className="capitalize text-lg font-semibold mb-4">
            {parameter.name}
          </h3>
          <div className="w-fulkl">
            <ParameterDictionaryInput
              parameter={parameter}
              onChange={onChange}
              parentParameter={undefined}
            />
          </div>
        </>
      );
  }
};
