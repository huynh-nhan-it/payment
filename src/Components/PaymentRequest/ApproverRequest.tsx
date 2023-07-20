import { DeleteTwoTone } from "@ant-design/icons";
import { Button, Select } from "antd";
import React from "react";
import { useState } from "react";
import './RequestDetails.css'

const ApproverRequest: React.FC = () => {
    const [approvers, setApprovers] = useState([{ name: 'Approver 1', role: '' }]);

  const addApprover = () => {
    const newApprover = {
      name: `Approver ${approvers.length + 1}`,
      role: ''
    };
    setApprovers([...approvers, newApprover]);
  };

  const handleApproverChange = (selectedOption: { value: any; label?: string; }, index: number) => {
    const updatedApprovers = [...approvers];
    updatedApprovers[index].role = selectedOption.value;
    setApprovers(updatedApprovers);
  };

  const deleteApprover = (index: number) => {
    const updatedApprovers = [...approvers];
    updatedApprovers.splice(index, 1);
    setApprovers(updatedApprovers);
  };

  const approversOption = [
    { value: '1 ', label: 'Approver 1'},
    { value: '2', label: 'Approver 2'},
  ];

  return(
    <div className="content-left">
      <p>Send to approvers</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', textAlign:'left' }}>
        {approvers.map((approver, index) => (
          <div key={index} style={{  marginRight: '10px',flex: '0 0 25%' }}>
            <h5>{approver.name}:</h5>
            <Select
      value={approversOption.find((option) => option.value === approver.role)}
      style={{ width: 200 }}
      onChange={(selectedOption) => handleApproverChange(selectedOption, index)}
      options={approversOption}
  /> 
            <DeleteTwoTone style={{ fontSize: '20px' }} onClick={() => deleteApprover(index)} key={undefined} onSelect={undefined} dir={undefined} children={undefined} disabled={undefined} multiple={undefined} max={undefined} required={undefined} type={undefined} data={undefined} default={undefined} high={undefined} low={undefined} id={undefined} media={undefined} height={undefined} width={undefined} start={undefined} open={undefined} name={undefined} color={undefined} content={undefined} translate={undefined} value={undefined} hidden={undefined} cite={undefined} form={undefined} label={undefined} slot={undefined} span={undefined} summary={undefined} title={undefined} pattern={undefined} acceptCharset={undefined} action={undefined} method={undefined} noValidate={undefined} target={undefined} accessKey={undefined} draggable={undefined} lang={undefined} className={undefined} prefix={undefined} contentEditable={undefined} inputMode={undefined} nonce={undefined} tabIndex={undefined} async={undefined} size={undefined} manifest={undefined} wrap={undefined} accept={undefined} allowFullScreen={undefined} allowTransparency={undefined} alt={undefined} as={undefined} autoComplete={undefined} autoPlay={undefined} capture={undefined} cellPadding={undefined} cellSpacing={undefined} charSet={undefined} challenge={undefined} checked={undefined} classID={undefined} cols={undefined} colSpan={undefined} controls={undefined} coords={undefined} crossOrigin={undefined} dateTime={undefined} defer={undefined} download={undefined} encType={undefined} formAction={undefined} formEncType={undefined} formMethod={undefined} formNoValidate={undefined} formTarget={undefined} frameBorder={undefined} headers={undefined} href={undefined} hrefLang={undefined} htmlFor={undefined} httpEquiv={undefined} integrity={undefined} keyParams={undefined} keyType={undefined} kind={undefined} list={undefined} loop={undefined} marginHeight={undefined} marginWidth={undefined} maxLength={undefined} mediaGroup={undefined} min={undefined} minLength={undefined} muted={undefined} optimum={undefined} defaultChecked={undefined} defaultValue={undefined} suppressContentEditableWarning={undefined} suppressHydrationWarning={undefined} autoFocus={undefined} contextMenu={undefined} placeholder={undefined} spellCheck={undefined} radioGroup={undefined} role={undefined} about={undefined} datatype={undefined} inlist={undefined} property={undefined} rel={undefined} resource={undefined} rev={undefined} typeof={undefined} vocab={undefined} autoCapitalize={undefined} autoCorrect={undefined} autoSave={undefined} itemProp={undefined} itemScope={undefined} itemType={undefined} itemID={undefined} itemRef={undefined} results={undefined} security={undefined} unselectable={undefined} is={undefined} aria-activedescendant={undefined} aria-atomic={undefined} aria-autocomplete={undefined} aria-busy={undefined} aria-checked={undefined} aria-colcount={undefined} aria-colindex={undefined} aria-colspan={undefined} aria-controls={undefined} aria-current={undefined} aria-describedby={undefined} aria-details={undefined} aria-disabled={undefined} aria-dropeffect={undefined} aria-errormessage={undefined} aria-expanded={undefined} aria-flowto={undefined} aria-grabbed={undefined} aria-haspopup={undefined} aria-hidden={undefined} aria-invalid={undefined} aria-keyshortcuts={undefined} aria-label={undefined} aria-labelledby={undefined} aria-level={undefined} aria-live={undefined} aria-modal={undefined} aria-multiline={undefined} aria-multiselectable={undefined} aria-orientation={undefined} aria-owns={undefined} aria-placeholder={undefined} aria-posinset={undefined} aria-pressed={undefined} aria-readonly={undefined} aria-relevant={undefined} aria-required={undefined} aria-roledescription={undefined} aria-rowcount={undefined} aria-rowindex={undefined} aria-rowspan={undefined} aria-selected={undefined} aria-setsize={undefined} aria-sort={undefined} aria-valuemax={undefined} aria-valuemin={undefined} aria-valuenow={undefined} aria-valuetext={undefined} playsInline={undefined} poster={undefined} preload={undefined} readOnly={undefined} reversed={undefined} rows={undefined} rowSpan={undefined} sandbox={undefined} scope={undefined} scoped={undefined} scrolling={undefined} seamless={undefined} selected={undefined} shape={undefined} sizes={undefined} src={undefined} srcDoc={undefined} srcLang={undefined} srcSet={undefined} step={undefined} useMap={undefined} wmode={undefined} dangerouslySetInnerHTML={undefined} onCopy={undefined} onCopyCapture={undefined} onCut={undefined} onCutCapture={undefined} onPaste={undefined} onPasteCapture={undefined} onCompositionEnd={undefined} onCompositionEndCapture={undefined} onCompositionStart={undefined} onCompositionStartCapture={undefined} onCompositionUpdate={undefined} onCompositionUpdateCapture={undefined} onFocus={undefined} onFocusCapture={undefined} onBlur={undefined} onBlurCapture={undefined} onChange={undefined} onChangeCapture={undefined} onBeforeInput={undefined} onBeforeInputCapture={undefined} onInput={undefined} onInputCapture={undefined} onReset={undefined} onResetCapture={undefined} onSubmit={undefined} onSubmitCapture={undefined} onInvalid={undefined} onInvalidCapture={undefined} onLoad={undefined} onLoadCapture={undefined} onError={undefined} onErrorCapture={undefined} onKeyDown={undefined} onKeyDownCapture={undefined} onKeyPress={undefined} onKeyPressCapture={undefined} onKeyUp={undefined} onKeyUpCapture={undefined} onAbort={undefined} onAbortCapture={undefined} onCanPlay={undefined} onCanPlayCapture={undefined} onCanPlayThrough={undefined} onCanPlayThroughCapture={undefined} onDurationChange={undefined} onDurationChangeCapture={undefined} onEmptied={undefined} onEmptiedCapture={undefined} onEncrypted={undefined} onEncryptedCapture={undefined} onEnded={undefined} onEndedCapture={undefined} onLoadedData={undefined} onLoadedDataCapture={undefined} onLoadedMetadata={undefined} onLoadedMetadataCapture={undefined} onLoadStart={undefined} onLoadStartCapture={undefined} onPause={undefined} onPauseCapture={undefined} onPlay={undefined} onPlayCapture={undefined} onPlaying={undefined} onPlayingCapture={undefined} onProgress={undefined} onProgressCapture={undefined} onRateChange={undefined} onRateChangeCapture={undefined} onSeeked={undefined} onSeekedCapture={undefined} onSeeking={undefined} onSeekingCapture={undefined} onStalled={undefined} onStalledCapture={undefined} onSuspend={undefined} onSuspendCapture={undefined} onTimeUpdate={undefined} onTimeUpdateCapture={undefined} onVolumeChange={undefined} onVolumeChangeCapture={undefined} onWaiting={undefined} onWaitingCapture={undefined} onAuxClick={undefined} onAuxClickCapture={undefined} onClickCapture={undefined} onContextMenu={undefined} onContextMenuCapture={undefined} onDoubleClick={undefined} onDoubleClickCapture={undefined} onDrag={undefined} onDragCapture={undefined} onDragEnd={undefined} onDragEndCapture={undefined} onDragEnter={undefined} onDragEnterCapture={undefined} onDragExit={undefined} onDragExitCapture={undefined} onDragLeave={undefined} onDragLeaveCapture={undefined} onDragOver={undefined} onDragOverCapture={undefined} onDragStart={undefined} onDragStartCapture={undefined} onDrop={undefined} onDropCapture={undefined} onMouseDown={undefined} onMouseDownCapture={undefined} onMouseEnter={undefined} onMouseLeave={undefined} onMouseMove={undefined} onMouseMoveCapture={undefined} onMouseOut={undefined} onMouseOutCapture={undefined} onMouseOver={undefined} onMouseOverCapture={undefined} onMouseUp={undefined} onMouseUpCapture={undefined} onSelectCapture={undefined} onTouchCancel={undefined} onTouchCancelCapture={undefined} onTouchEnd={undefined} onTouchEndCapture={undefined} onTouchMove={undefined} onTouchMoveCapture={undefined} onTouchStart={undefined} onTouchStartCapture={undefined} onPointerDown={undefined} onPointerDownCapture={undefined} onPointerMove={undefined} onPointerMoveCapture={undefined} onPointerUp={undefined} onPointerUpCapture={undefined} onPointerCancel={undefined} onPointerCancelCapture={undefined} onPointerEnter={undefined} onPointerEnterCapture={undefined} onPointerLeave={undefined} onPointerLeaveCapture={undefined} onPointerOver={undefined} onPointerOverCapture={undefined} onPointerOut={undefined} onPointerOutCapture={undefined} onGotPointerCapture={undefined} onGotPointerCaptureCapture={undefined} onLostPointerCapture={undefined} onLostPointerCaptureCapture={undefined} onScroll={undefined} onScrollCapture={undefined} onWheel={undefined} onWheelCapture={undefined} onAnimationStart={undefined} onAnimationStartCapture={undefined} onAnimationEnd={undefined} onAnimationEndCapture={undefined} onAnimationIteration={undefined} onAnimationIterationCapture={undefined} onTransitionEnd={undefined} onTransitionEndCapture={undefined} />
          </div>
        ))}
      </div >
      <Button type = "primary"style={{ margin:'10px', display: 'flex', flexDirection: 'row', padding: 20, alignItems: 'center' }} onClick={addApprover}>+ Add Approver</Button>
    </div>
  );
};
export default ApproverRequest;