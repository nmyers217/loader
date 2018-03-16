import uuid from 'uuid/v4';
import { getVisibleNodeCount,  changeNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';

import * as ActionTypes from '../ActionTypes';

const getNewNode = () => ({
  id: uuid(),
  displayTitle: '',
  title: 'Edit Me :(',
  children: []
});

const initialState = {
  data: [],
  visibileCount: 0
};

const getNodeKey = ({ node }) => node.id;

export default function tree (state=initialState, action) {
  switch (action.type) {
    case ActionTypes.SWAP_TREE:
      return {
        ...state,
        data: action.payload.treeData,
        visibleCount: getVisibleNodeCount({ treeData: action.payload.treeData })
      };
    case ActionTypes.SWAP_NODE_AT_PATH:
      return {
        ...state,
        data: changeNodeAtPath({
          treeData: state.data,
          path: action.payload.path,
          newNode: action.payload.newNode,
          getNodeKey,
          ignoreCollapsed: false
        })
      };
    case ActionTypes.REMOVE_NODE_AT_PATH:
      return {
        ...state,
        data: removeNodeAtPath({ treeData: state.data, path: action.payload.path, getNodeKey }),
        visibileCount: state.visibileCount - 1
      };
    case ActionTypes.ADD_NEW_NODE:
      return {
        ...state,
        data: state.data.concat(getNewNode()),
        visibileCount: state.visibileCount + 1
      };
    default:
      return state;
  }
}