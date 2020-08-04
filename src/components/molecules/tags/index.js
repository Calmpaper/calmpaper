import React, { useState, useEffect } from 'react'
import { useMutation } from 'urql'
import { createTagMutation } from 'api'
import Select from 'react-select/creatable'

export const tags = ({
  tags = [],
  selectable = false,
  value = [],
  onChange = () => {},
}) => {
  const [options, setOptions] = useState(
    tags.map((tag) => ({ value: tag.id, label: tag.label })),
  )

  useEffect(() => {
    selectable &&
      setOptions(tags.map((tag) => ({ value: tag.id, label: tag.label })))
  }, [tags])

  const [, createTag] = useMutation(createTagMutation)

  const handleChange = (newValue, actionMeta) => {
    onChange(newValue)
  }

  if (!selectable) {
    return (
      tags.length > 0 && (
        <div className="row row03">
          <h4 className="title size04">Tags</h4>
          <ul>
            {tags.map((tag) => (
              <li key={tag.id}>
                <a href="/">{tag.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )
    )
  }
  return (
    <div class="block block06 add-series-tags">
      <h3 class="title size04">Tags</h3>

      <Select
        isMulti
        name="colors"
        options={options}
        onChange={handleChange}
        value={value}
        onCreateOption={(label) =>
          createTag({ label }).then(
            ({ data: { createOneTag: tag = {} } = {} }) => {
              onChange([...value, { value: tag.id, label: tag.label }])
            },
          )
        }
        placeholder="Select tags"
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            // primary25: 'hotpink',
            primary: 'black',
          },
          spacing: {
            ...theme.spacing,
            controlHeight: 47,
            // menuGutter: 40,
            // baseUnit: 2,
          },
        })}
      />
      <div class="select-text">
        Each novel is limited to 25 tags. You can search for tags using the
        search bar below.
      </div>
    </div>
  )
}

export default ({ tags, onChange, value = [] }) => {}
