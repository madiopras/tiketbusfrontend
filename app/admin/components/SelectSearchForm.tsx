import React, { useState, useCallback, useEffect } from 'react';
import Select from 'react-select';
import axios from '@/lib/axios'; // Sesuaikan path sesuai kebutuhan

interface SelectSearchFormProps {
  id?: string;
  label: string;
  name: string;
  value: number;
  onChange: (value: number, label: string, valueprice: number) => void; // Ubah onChange untuk menerima value dan label
  apiEndpoint: string; // Endpoint API yang dinamis
  mapData: (data: any) => { label: string; value: number; valueprice: number }[]; // Fungsi untuk memetakan data
  required?: boolean;
  disabled?: boolean;
}

const SelectSearchForm: React.FC<SelectSearchFormProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  apiEndpoint,
  mapData,
  required = false,
  disabled = false,
}) => {
  const [options, setOptions] = useState<{ label: string; value: number; valueprice: number }[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [showError, setShowError] = useState(false);

  const fetchOptions = useCallback(
    async (query: string) => {
      try {
        const response = await axios.get(apiEndpoint, {
          params: {
            name: query,
            limit: 10,
          },
        });
        const formattedOptions = mapData(response.data.data);
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Gagal mengambil data', error);
      }
    },
    [apiEndpoint, mapData]
  );

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetchOptions = useCallback(debounce(fetchOptions, 2000), [fetchOptions]);

  useEffect(() => {
    if (searchInput.length >= 4) {
      debouncedFetchOptions(searchInput);
    } else if (searchInput.length === 0) {
      fetchDefaultOptions();
    }
  }, [searchInput, debouncedFetchOptions]);

  const fetchDefaultOptions = useCallback(async () => {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          limit: 50,
        },
      });
      const formattedOptions = mapData(response.data.data);
      setOptions(formattedOptions);
    } catch (error) {
      console.error('Gagal mengambil data default', error);
    }
  }, [apiEndpoint, mapData]);

  const handleSearchChange = (inputValue: string) => {
    setSearchInput(inputValue);
  };

  const handleSelectChange = (selectedOption: { value: number; label: string; valueprice: number } | null) => {
    if (selectedOption) {
      onChange(selectedOption.value, selectedOption.label, selectedOption.valueprice); // Kirim value, label, dan harga
    } else {
      onChange(0, "", 0); // Reset jika tidak ada yang dipilih
    }
    setShowError(required && (!selectedOption || selectedOption.value === 0));
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: showError ? 'red' : provided.borderColor,
      minHeight: '32px',
      height: '32px',
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        borderColor: 'blue',
      },
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      height: '32px',
      padding: '0 6px',
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state: any) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      height: '32px',
    }),
  };

  return (
    <div className="form-control mb-2">
      <label className="label text-sm" htmlFor={id}>
        {label}
      </label>
      <Select
        id={id}
        options={options}
        onChange={handleSelectChange}
        onInputChange={handleSearchChange}
        isSearchable
        isClearable
        value={options.find((option) => option.value === value)}
        styles={customStyles}
        isDisabled={disabled}
        aria-required={required}
      />
      <div className="label">
        {showError && <span className="label-text-alt text-error">Field ini wajib diisi</span>}
      </div>
    </div>
  );
};

export default SelectSearchForm;
