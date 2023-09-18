import { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'

// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css'
interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;

}
export default function BootomView({
    isOpen,
    onClose,
    children,
}: Props) {

  return (
      <BottomSheet open={isOpen}>My awesome content here</BottomSheet>
  )
}