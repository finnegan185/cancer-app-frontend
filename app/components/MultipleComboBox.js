// import React, { useMemo, useState } from "react";
// import { useCombobox, useMultipleSelection } from "downshift";

// // Practice array. Will replace with actual database values
// const books = [
//   { author: "Harper Lee", title: "To Kill a Mockingbird" },
//   { author: "Lev Tolstoy", title: "War and Peace" },
//   { author: "Fyodor Dostoyevsy", title: "The Idiot" },
//   { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
//   { author: "George Orwell", title: "1984" },
//   { author: "Jane Austen", title: "Pride and Prejudice" },
//   { author: "Marcus Aurelius", title: "Meditations" },
//   { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
//   { author: "Lev Tolstoy", title: "Anna Karenina" },
//   { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
// ];
// const initialSelectedItems = [books[0], books[1]];

// function getFilteredBooks(selectedItems, inputValue) {
//   const lowerCasedInputValue = inputValue.toLowerCase();

//   return books.filter(function filterBook(book) {
//     return !selectedItems.includes(book) && (book.title.toLowerCase().includes(lowerCasedInputValue) || book.author.toLowerCase().includes(lowerCasedInputValue));
//   });
// }

// // End of practice array code

// // Mutliple ComboBox Function
// function MultipleComboBox() {
//   const [inputValue, setInputValue] = useState("");
//   const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

//   const items = useMemo(() => getFilteredBooks(selectedItems, inputValue), [selectedItems, inputValue]);

//   const { getSelectedItemProps, getDropdownProps, addSelectedItem, removeSelectedItem } = useMultipleSelection({
//     selectedItems,
//     onStateChange({ selectedItems: newSelectedItems, type }) {
//       switch (type) {
//         case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
//         case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
//         case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
//         case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
//           setSelectedItems(newSelectedItems);
//           break;
//         default:
//           break;
//       }
//     },
//   });

//   const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } = useCombobox({
//     items,
//     itemToString(item) {
//       return item ? item.title : "";
//     },
//     defaultHighlightedIndex: 0,
//     selectedItem: null,
//     stateReducer(state, actionAndChanges) {
//       const { changes, type } = actionAndChanges;

//       switch (type) {
//         case useCombobox.stateChangeTypes.InputKeyDownEnter:
//         case useCombobox.stateChangeTypes.ItemClick:
//         case useCombobox.stateChangeTypes.InputBlur:
//           return {
//             ...changes,
//             ...(changes.selectedItem && { isOpen: true, highlightedIndex: 0 }),
//           };
//         default:
//           return changes;
//       }
//     },
//     onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
//       switch (type) {
//         case useCombobox.stateChangeTypes.InputKeyDownEnter:
//         case useCombobox.stateChangeTypes.ItemClick:
//           setSelectedItems([...selectedItems, newSelectedItem]);
//           break;

//         case useCombobox.stateChangeTypes.InputChange:
//           setInputValue(newInputValue);
//           break;

//         default:
//           break;
//       }
//     },
//   });
//   return (
//     <div className="py-3 px-2">
//       <div>
//         <label className="form-label lead" {...getLabelProps()}>
//           Pick some books:
//         </label>
//         <div className="form-select dropdown-items" {...getToggleButtonProps()}>
//           {selectedItems.map(function renderSelectedItem(selectedItemForRender, index) {
//             return (
//               <span
//                 className="badge selected-items"
//                 key={`selected-item-${index}`}
//                 {...getSelectedItemProps({
//                   selectedItem: selectedItemForRender,
//                   index,
//                 })}
//               >
//                 {selectedItemForRender.title}
//                 <span
//                   className="p-1 btn btn-sm"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeSelectedItem(selectedItemForRender);
//                   }}
//                 >
//                   &#10005;
//                 </span>
//               </span>
//             );
//           })}
//           <input className="invisible list-group-item--hover" {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))} />
//         </div>
//         <div className="dropdown-items">
//           <ul {...getMenuProps()} className="list-group">
//             {isOpen &&
//               items.map((item, index) => (
//                 <li className="list-group-item list-group-item--hover" key={`${item.value}${index}`} {...getItemProps({ item, index })}>
//                   <span>{item.title} by </span>
//                   <span className="">{item.author}</span>
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MultipleComboBox;
