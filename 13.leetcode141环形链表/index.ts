function hasCycle(head) {
  if (!head || !head.next) return false
  let show = head, fast = head.next
  while(fast && fast.next && show !== fast) {
    show = show.next
    fast = fast.next.next
  }
  return fast === show
};