
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */


function reverseList1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  let tail = head.next
	// 假设链表 1 2 3 4 
	// reverseList 会拿到反转后的 4 3 2，那么上面保存的 tail 就是反转后的尾节点
	const newHead = reverseList1(head.next)
	// 将原本的头节点作为新的尾节点存在
	tail.next = head
	// 断开原本的头节点的链接
	head.next = null
	// 返回新的头节点
	return newHead
};