import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  ListBulletIcon,
  QuoteIcon,
  HeadingIcon,
  Cross1Icon,
  AlignLeftIcon
} from '@radix-ui/react-icons';
import '../Toolbar.css';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getNodeByKey
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isParentElementRTL,
  $wrapNodes,
  $isAtNodeEnd
} from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode
} from "@lexical/list";
import { createPortal } from "react-dom";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode
} from "@lexical/rich-text";
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages
} from "@lexical/code";
import { CodeFilled, CodeSandboxCircleFilled, DownOutlined, EditFilled, EditTwoTone, FieldNumberOutlined, NumberOutlined, SaveFilled, SaveTwoTone, StopTwoTone } from '@ant-design/icons';
import { Dropdown,Select, message, Space,Modal,Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { seteditable, setonselectEditable } from "../../../Utils/Reducers/editorSlice";
import { Theme,Flex,Container,Box, Card, Heading, Text } from "@radix-ui/themes";
import * as Separator from '@radix-ui/react-separator';
import { getdocs, saveFile } from "../../../apis/DocsApi";

const LowPriority = 1;

const supportedBlockTypes = new Set([
  "paragraph",
  "quote",
  "code",
  "h1",
  "h2",
  "ul",
  "ol"
]);
const currentdate = new Date(); 
const datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
const plchldr = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes()  + " | " 
                + " Enter a title for this record"


const blockTypeToBlockName = {
  code: "Code Block",
  h1: "Large Heading",
  h2: "Small Heading",
  h3: "Heading",
  h4: "Heading",
  h5: "Heading",
  ol: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
  ul: "Bulleted List"
};

function Divider() {
  return <div className="divider" />;
}

function positionEditorElement(editor, rect) {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}


function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

export default function NewToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(
    false
  );
  const [code,setcode] = useState(false)
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  function MySmallCurdComponent() {
      //for save and edit playing with store at 3am
      const saveContent = useSelector((state)=>state.tosavecontent.value);
      const iseditable = useSelector((state) =>state.editor.value.editable)
      const onselectedit =  useSelector((state) =>state.editor.value.onselectEditable)
      const title = useSelector((state)=>state.page.value['title']);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const folder =  useSelector((state)=>state.page.value['folder']);
      const folderList = useSelector((state)=>state.directory.value.folderList);

      const [currfoldername,setinputFolder] = useState(folder)
      const [currtitle,setcurrTitle] =useState(title)
      const [savelabel,setsavelabel] = useState("Save")


      const dispatch = useDispatch()

      function makeEditable() {
        editor.setEditable(true)
        dispatch(seteditable(true))
            setcurrTitle(title)     
      }
      function makeUneditable() {
        editor.setEditable(false)
        dispatch(seteditable(false))
        dispatch(setonselectEditable(false))
      }

      function makeFolderEdit(value) {
        dispatch(setonselectEditable(value))
      }

      function setCurrentTitle(value) {
        setcurrTitle(value)
        if(value != title){
          setsavelabel("Save As")
        }else{
          setsavelabel("Save")
        }
      }


      const showModal = () => {
      setIsModalOpen(true);
      };
      const handleOk = () => {
      console.log("save content =====> ",  saveContent)
          //dispatch(setCurrFolder(currfoldername))
          saveFile(saveContent,currtitle,currfoldername)
          getdocs().then(res => {
            dispatch(updatedirectory(res)) 
          }).catch(error => console.error(error))
          dispatch(setonselectEditable(false))
          dispatch(seteditable(false))
          editor.setEditable(false)
          setIsModalOpen(false);
          message.info(`File Saved !`);
      };
      const handleCancel = () => {
      setIsModalOpen(false);
      };

    return ( 
      <div style={{'display' : 'flex', 'flexDirection' : 'row' , 'gap' : '1rem', 'marginLeft' : 'auto', 'padding' : '5px', 'alignItems' : 'center'}}>
      {(!iseditable)&&<EditTwoTone onClick={() => makeEditable()} />}  
      {(iseditable)&&<SaveTwoTone  onClick={() => showModal()} />}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Card style={{'width' :'25rem' ,'display':'flex','flexGrow' : '6'}}>
                <Flex direction={"column"} >
                  {(!iseditable)&&<Heading size={"5"}>{title}</Heading>}
                  {(iseditable)&&<Input style={{'width':'50rem'}} value={currtitle} disabled={false} onChange={(e)=>setCurrentTitle(e.target.value)} placeholder={plchldr} />}

                  <Separator.Root className="SeparatorRoot" style={{ margin: '5px 0px' }} />
                  <Flex style={{'justifyContent' :'flex-start' ,'gap': '1rem','alignItems':'baseline'}}>            
                    <Heading size={"2"}>Folder</Heading> 
                    {(!onselectedit) &&<Select disabled = {!iseditable} value={currfoldername} options={folderList} onSelect={(x) => {setinputFolder(x)}} ></Select>}
                    {(onselectedit)  &&<Input style={{'width':'30rem'}} value={currfoldername} disabled={false} onChange={(e)=>setinputFolder(e.target.value)} placeholder={plchldr} />}
                    {(iseditable&&!onselectedit) &&< EditTwoTone label="edit" onClick={(x) => {makeFolderEdit(true)}} > </EditTwoTone> }
                    {(iseditable&&onselectedit)  &&< Cross1Icon label="edit" onClick={(x) => {makeFolderEdit(false)}} > </Cross1Icon> }
                  </Flex>
                </Flex>
              </Card>
      </Modal>
      {(iseditable)&&<StopTwoTone onClick={() => makeUneditable()}/>}
      </div>
     
    )
  }

  
  function CustomDropDown () {
 
    const iseditable = useSelector((state) =>state.editor.value.editable)

    const onClick = ({ key }) => {
      // message.info(`Click on item ${key}`);
      if(key == '1') {
        editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createParagraphNode());
          }
        });      }
      else if(key == '2'){
        editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createHeadingNode("h1"));
          }
        });
      }
      else if(key == '3'){
        editor.update(() => {
            const selection = $getSelection();
    
            if ($isRangeSelection(selection)) {
              $wrapNodes(selection, () => $createHeadingNode("h3"));
            }
          });      }
      else if(key == '4'){
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
      }
      else if(key == '5'){
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND); 
      }
      else if(key == '6'){
        setcode(true)
        editor.update(() => {
          const selection = $getSelection();
  
          if ($isRangeSelection(selection)) {
            $wrapNodes(selection, () => $createCodeNode());
          }
        });
      }
      else if(key == '7'){

      }
      else if(key == '8'){

      }
    };

    const items = [
      {
        label: <span style={{'display' : 'flex', 'justifyContent' : 'space-evenly' , 'alignItems' : 'center'}} ><AlignLeftIcon />Normal</span>,
        key: '1',
      },
      {
        label:   <span style={{'display' : 'flex', 'justifyContent' : 'space-evenly' , 'alignItems' : 'center'}} ><HeadingIcon />Heading 1</span>,
        key: '2',
      },
      {
        label:  <span style={{'display' : 'flex', 'justifyContent' : 'space-evenly' , 'alignItems' : 'center'}} ><HeadingIcon />Heading 2</span>,
        key: '3',
      },
      {
        label:  <span style={{'display' : 'flex', 'justifyContent' : 'space-evenly' , 'alignItems' : 'center'}} ><ListBulletIcon />Bullet Points</span>,
        key: '4',
      },
      {
        label:  <span style={{'display' : 'flex', 'justifyContent' : 'space-evenly' , 'alignItems' : 'center'}} ><NumberOutlined />Number List</span>,
        key: '5',
      },
      {
        label:  <span style={{'display' : 'flex', 'justifyContent' : 'space-evenly' , 'alignItems' : 'center'}} ><CodeFilled />Code Block</span>,
        key: '6',
      },
    ];

    return(
      <Dropdown
      disabled = {!iseditable}
      menu={{
        items,
        onClick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Options
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
    )
  }

  function LanguageDropDown ({codeLanguage,oncodechange}) {
 
    const onClick = ({ key }) => {
      message.info(`Click on item ${key}`);
      oncodechange(key)
    };

    //  var count = 1
    //  const item1 = []
    // codeLanguage.map((x)=> {
    //     const a= {
    //         label : x,
    //         key : count
    //     }
    //     item1.push(a)
    //     count++
    // })
    
    // console.log(item1)

    const items = [
        {
          label: "js",
          key: "js",
        },
        {
          label: 'python',
          key: 'python',
        },
        {
          label: 'cpp',
          key: 'cpp',
        },
        {
          label: 'plaintext',
          key: 'plaintext',
        },
        {
          label: 'html',
          key: 'html',
        },
      ];
      console.log(items)
    return(
      <Dropdown
      menu={{
        items,
        onClick,
      }}
     >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Options
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
    )
  }
  
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguages = useMemo(() => getCodeLanguages(), []);

  function onCodeLanguageSelect(value){

    console.log("on code language change")
    editor.update(() => {
      if (selectedElementKey !== null) {
        const node = $getNodeByKey(selectedElementKey);
        if ($isCodeNode(node)) {
          node.setLanguage(value);
        }
      }
    });
  }
    
  const iseditable  = useSelector((state) =>state.editor.value.editable)
    
    

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (

  <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
    <Toolbar.ToggleGroup disabled={!iseditable} type="multiple" aria-label="Text formatting">
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="bold" aria-label="Bold" onClick={()=> {editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}}>
        <FontBoldIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="italic" aria-label="Italic" onClick={()=> { editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");}}>
        <FontItalicIcon />
      </Toolbar.ToggleItem>
      {/* <Toolbar.ToggleItem className="ToolbarToggleItem" value="h2" aria-label="h2">
        <HeadingIcon />
      </Toolbar.ToggleItem> */}
      
      <Toolbar.ToggleItem
        className="ToolbarToggleItem"
        value="strikethrough"
        aria-label="Strike through"
        onClick={()=> { editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");}}
      >
        <StrikethroughIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="ToolbarSeparator" />
    <Toolbar.ToggleGroup disabled={!iseditable} type="single" defaultValue="left" aria-label="Text alignment">
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="left" aria-label="Left aligned" onClick={()=> { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");}}>
        <TextAlignLeftIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="center" aria-label="Center aligned" onClick={()=> {editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");}}>
        <TextAlignCenterIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="right" aria-label="Right aligned" onClick={()=> {editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");}}>
        <TextAlignRightIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem className="ToolbarToggleItem" value="bold" aria-label="Bold" onClick={()=> { editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });}}>
        <QuoteIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator className="ToolbarSeparator" />

    {/* custom toolbar drowpdown */}
    <CustomDropDown/>
    {/* {code&&
       <LanguageDropDown codeLanguage={codeLanguages} oncodechange={onCodeLanguageSelect}/>
      } */}
    {/* <Toolbar.Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
      Share
    </Toolbar.Button> */}

    {/* small curd modal attached to the toolbar */}
    <MySmallCurdComponent/>

  </Toolbar.Root>

     );
}
